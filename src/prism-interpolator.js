class prismCell {
  constructor(v0, v1, v2, v3, v4, v5, s0, s1, s2, s3, s4, s5) {
    this.V = [ v0, v1, v2, v3, v4, v5 ];  //coordinates
    this.S = [ s0, s1, s2, s3, s4, s5 ];  //scalar
    this.verticies = 6;
  }

  localToGlobal(local) {
    let x = 0;
    let y = 0;
    let z = 0;

    const N = this.getInterpolationFunctions(local);

    for (let i = 0; i < this.verticies; i++) {
      x += N[ i ] * this.V[ i ][ 0 ];
      y += N[ i ] * this.V[ i ][ 1 ];
      z += N[ i ] * this.V[ i ][ 2 ];
    }

    const global = [ x, y, z ];
    return global;
  }

  globalToLocal (global) {
    const E = 0.00001;    //Convergence condition
    let X = global;
    let x0 = [0.5, 0.5, 0.5];   //initial value of local coordinates

    for(let i = 0; i < 10000; i++){
      let X0 = this.localToGlobal(l0);
      let dX = this.minus_1_1(X, X0);

      let J = this.jacobian(x0);
      let dx = this.multiply_3_1(this.inverse(J), dX);
      if(Math.sqrt(dx[0] * dx[0] + dx[1] * dx[1] + dx[2] * dx[2]) < E)
        break;

      x0[0] += dx[0];
      x0[1] += dx[1];
      x0[2] += dx[2];
    }
    return x0;
  }

  getInterpolationFunctions(local) {
    const p = local[0];
    const q = local[1];
    const r = local[2];

    let N = new Array(this.verticies);

    N[ 0 ] = (1 - p - q) * r;
    N[ 1 ] = p * r;
    N[ 2 ] = q * r;
    N[ 3 ] = (1 - p - q) * (1 - r);
    N[ 4 ] = p * (1 - r);
    N[ 5 ] = q * (1 - r);

    return N;
  }

  differentialFunction(local) {
    const p = local[0];
    const q = local[1];
    const r = local[2];

    let dNdp = new Array(this.verticies);
    let dNdq = new Array(this.verticies);
    let dNdr = new Array(this.verticies);

    dNdp[0] = -r;
    dNdp[1] =  r;
    dNdp[2] =  0;
    dNdp[3] = -( 1 - r );
    dNdp[4] =  ( 1 - r );
    dNdp[5] =  0;

    dNdq[0] = -r;
    dNdq[1] =  0;
    dNdq[2] =  r;
    dNdq[3] = -( 1 - r );
    dNdq[4] =  0;
    dNdq[5] =  ( 1 - r );

    dNdr[0] =  ( 1 - p - q );
    dNdr[1] =  p;
    dNdr[2] =  q;
    dNdr[3] = -( 1 - p - q );
    dNdr[4] = -p;
    dNdr[5] = -q;

    let dN = [dNdp, dNdq, dNdr];
    return dN;
  }

  jacobian(local) {
    let dN = this.differentialFunction(local);  //dN = [dNdp[6], dNdq[6], dNdr[6]]

    let dxdp = 0;
    let dydp = 0;
    let dzdp = 0;
    for(let i = 0; i < this.verticies; i++){
      dxdp += dN[0][i] * this.V[i][0];
      dydp += dN[0][i] * this.V[i][1];
      dzdp += dN[0][i] * this.V[i][2];
    }

    let dxdq = 0;
    let dydq = 0;
    let dzdq = 0;
    for(let i = 0; i < this.verticies; i++){
      dxdq += dN[1][i] * this.V[i][0];
      dydq += dN[1][i] * this.V[i][1];
      dzdq += dN[1][i] * this.V[i][2];
    }

    let dxdr = 0;
    let dydr = 0;
    let dzdr = 0;
    for(let i = 0; i < this.verticies; i++){
      dxdr += dN[2][i] * this.V[i][0];
      dydr += dN[2][i] * this.V[i][1];
      dzdr += dN[2][i] * this.V[i][2];
    }

    const jacobiMatrix = [[dxdp, dydp, dzdp], [dxdq, dydq, dzdq], [dxdr, dydr, dzdr]];
    return jacobiMatrix;
  }

  gradient(local) {
    let dN = this.differentialFunction(local);  //dN = [dNdp[6], dNdq[6], dNdr[6]]

    let dSdx = 0;
    let dSdy = 0;
    let dSdz = 0;
    for(let i = 0; i < this.verticies; i++){
      dSdx += this.S[i] * dN[0][i];
      dSdy += this.S[i] * dN[1][i];
      dSdz += this.S[i] * dN[2][i];
    }

    const J = this.jacobian(local);
    const G = this.multiply_3_1(this.inverse(J), [dSdx, dSdy, dSdz]);
    return G;
  }

  calculateScalar(local) {
    const p = local[0];
    const q = local[1];
    const r = local[2];

    let N = this.getInterpolationFunctions(local);

    let S = 0;
    for(let i = 0; i < this.verticies; i++){
      S += N[i] * S[i];
    }
    return S;
  }


  randomSampling() {
    var p = Math.random();
    var q = Math.random();
    var r = Math.random();
    var local = [];
    if(p + q > 1) {
      local[0] = 1 - p;
      local[1] = 1 - q;
      local[2] = r;
    }else {
      local[0] = p;
      local[1] = q;
      local[2] = r;
    }
    return local;
  }

  determinant(A) {
    const a0 = A[0][0] * A[1][1] * A[2][2];
    const a1 = A[1][0] * A[2][1] * A[0][2];
    const a2 = A[2][0] * A[0][1] * A[1][2];

    const b0 = A[0][2] * A[1][1] * A[2][0];
    const b1 = A[1][2] * A[2][1] * A[0][0];
    const b2 = A[2][2] * A[0][1] * A[1][0];

    return a0 + a1 + a2 - b0 - b1 - b2;
  }


  inverse(A) {
    let Ainv = [];
    Ainv[0] = new Array(3);
    Ainv[1] = new Array(3);
    Ainv[2] = new Array(3);
    const detA_inv = 1 / this.determinant(A);

    Ainv[0][0] = detA_inv * (A[1][1] * A[2][2] - A[1][2] * A[2][1]);
    Ainv[0][1] = detA_inv * (A[0][2] * A[2][1] - A[0][1] * A[2][2]);
    Ainv[0][2] = detA_inv * (A[0][1] * A[1][2] - A[0][2] * A[1][1]);

    Ainv[1][0] = detA_inv * (A[1][2] * A[2][0] - A[1][0] * A[2][2]);
    Ainv[1][1] = detA_inv * (A[0][0] * A[2][2] - A[0][2] * A[2][0]);
    Ainv[1][2] = detA_inv * (A[0][2] * A[1][0] - A[0][0] * A[1][2]);

    Ainv[2][0] = detA_inv * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
    Ainv[2][1] = detA_inv * (A[0][1] * A[2][0] - A[0][0] * A[2][1]);
    Ainv[2][2] = detA_inv * (A[0][0] * A[1][1] - A[0][1] * A[1][0]);

    return Ainv;
  }

  multiply_3_1(A, B) {
    let C = new Array(3);
    C[0] = A[0][0] * B[0] + A[0][1] * B[1] + A[0][2] * B[2];
    C[1] = A[1][0] * B[0] + A[1][1] * B[1] + A[1][2] * B[2];
    C[2] = A[2][0] * B[0] + A[2][1] * B[1] + A[2][2] * B[2];
    return C;
  }

  minus_1_1(A, B){
    let C = new Array(3);
    C[0] = A[0] - B[0];
    C[1] = A[1] - B[1];
    C[2] = A[2] - B[2];
    return C;
  }
}

